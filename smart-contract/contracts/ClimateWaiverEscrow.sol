// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DisaXta.sol";

contract ClimateWaiverEscrow {
    DisaXta public dsx;

    struct Incident {
        address reporter;
        string descriptionURL;
        uint256 fundingGoal;
        uint256 raisedAmount;
        bool isClaimed;
        mapping(address => uint256) donations;
    }

    mapping(uint256 => Incident) incidents;
    uint256 public incidentCount;

    event IncidentReported(uint256 indexed incidentId, address reporter, string descriptionURL, uint256 fundingGoal);
    event FundsRaised(uint256 indexed incidentId, address donor, uint256 amount);
    event FundsClaimed(uint256 indexed incidentId, address recipient, uint256 amount);

    constructor(address _dsxAddress) {
        dsx = DisaXta(_dsxAddress);
    }

    function reportIncident(string memory _descriptionURL, uint256 _fundingGoal) external {
        incidentCount++;
        Incident storage newIncident = incidents[incidentCount];
        newIncident.reporter = msg.sender;
        newIncident.descriptionURL = _descriptionURL;
        newIncident.fundingGoal = _fundingGoal;
        newIncident.raisedAmount = 0;
        newIncident.isClaimed = false;

        emit IncidentReported(incidentCount, msg.sender, _descriptionURL, _fundingGoal);
    }

    function donateToIncident(uint256 _incidentId, uint256 _amount) external {
        require(_incidentId <= incidentCount && _incidentId > 0, "Invalid incident ID");
        Incident storage incident = incidents[_incidentId];
        require(!incident.isClaimed, "Funds have already been claimed");

        require(dsx.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        incident.donations[msg.sender] += _amount;
        incident.raisedAmount += _amount;

        emit FundsRaised(_incidentId, msg.sender, _amount);
    }

    function claimFunds(uint256 _incidentId) external {
        require(_incidentId <= incidentCount && _incidentId > 0, "Invalid incident ID");
        Incident storage incident = incidents[_incidentId];
        require(msg.sender == incident.reporter, "Only the incident reporter can claim funds");
        require(!incident.isClaimed, "Funds have already been claimed");
        require(incident.raisedAmount > 0, "No funds available to claim");

        uint256 amountToClaim = incident.raisedAmount;
        incident.isClaimed = true;

        require(dsx.transfer(msg.sender, amountToClaim), "Transfer failed");

        emit FundsClaimed(_incidentId, msg.sender, amountToClaim);
    }

    function getIncidentDetails(uint256 _incidentId) external view returns (
        address reporter,
        string memory descriptionURL,
        uint256 fundingGoal,
        uint256 raisedAmount,
        bool isClaimed
    ) {
        require(_incidentId <= incidentCount && _incidentId > 0, "Invalid incident ID");
        Incident storage incident = incidents[_incidentId];
        return (
            incident.reporter,
            incident.descriptionURL,
            incident.fundingGoal,
            incident.raisedAmount,
            incident.isClaimed
        );
    }

    function getDonationAmount(uint256 _incidentId, address _donor) external view returns (uint256) {
        require(_incidentId <= incidentCount && _incidentId > 0, "Invalid incident ID");
        return incidents[_incidentId].donations[_donor];
    }
}