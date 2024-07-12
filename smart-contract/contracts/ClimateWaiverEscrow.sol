// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DisaXta.sol";

contract ClimateWaiverEscrow {
    DisaXta public dsx;

    struct Donor {
        address donorAddress;
        uint256 amount;
    }

    struct Incident {
        uint256 incidentId;
        address reporter;
        string descriptionURL;
        uint256 fundingGoal;
        uint256 raisedAmount;
        bool isClaimed;
        Donor[] donors;
    }

    mapping(address => bool) uniqueDonors;
    mapping(uint256 => Incident) incidents;
    uint256 public incidentCount;
    uint256 totalUnique;

    event IncidentReported(uint256 indexed incidentId, address reporter, string descriptionURL, uint256 fundingGoal);
    event FundsRaised(uint256 indexed incidentId, address donor, uint256 amount);
    event FundsClaimed(uint256 indexed incidentId, address recipient, uint256 amount);

    constructor(address _dsxAddress) {
        dsx = DisaXta(_dsxAddress);
    }

    function reportIncident(string memory _descriptionURL, uint256 _fundingGoal) external {
        incidentCount++;
        Incident storage newIncident = incidents[incidentCount];
        newIncident.incidentId = incidentCount;
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

        bool donorExists = false;
        for (uint i = 0; i < incident.donors.length; i++) {
            if (incident.donors[i].donorAddress == msg.sender) {
                incident.donors[i].amount += _amount;
                donorExists = true;
                break;
            }
        }

        if (!donorExists) {
            incident.donors.push(Donor({
                donorAddress: msg.sender,
                amount: _amount
            }));
        }

        incident.raisedAmount += _amount;
        totalUniqueDonors();

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
        // incident.raisedAmount = 0; // This is muted so the amount stays on for record

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
        Incident storage incident = incidents[_incidentId];
        for (uint i = 0; i < incident.donors.length; i++) {
            if (incident.donors[i].donorAddress == _donor) {
                return incident.donors[i].amount;
            }
        }
        return 0;
    }

    function getDonorsForIncident(uint256 _incidentId) external view returns (Donor[] memory) {
        require(_incidentId <= incidentCount && _incidentId > 0, "Invalid incident ID");
        return incidents[_incidentId].donors;
    }

    function getAllIncidentsWithDonors() external view returns (Incident[] memory) {
        Incident[] memory allIncidents = new Incident[](incidentCount);

        for (uint256 i = 1; i <= incidentCount; i++) {
            allIncidents[i-1] = incidents[i];
        }

        return allIncidents;
    }

    function totalUniqueDonors() internal {
        for (uint256 i = 1; i <= incidentCount; i++) {
            Incident storage incident = incidents[i];
            for (uint256 j = 0; j < incident.donors.length; j++) {
                if (!uniqueDonors[incident.donors[j].donorAddress]) {
                    uniqueDonors[incident.donors[j].donorAddress] = true;
                    totalUnique++;
                }
            }
        }
    }

    function getTotalUniqueDonors() external view returns (uint256) {
        return totalUnique;
    }

    function getTotalFundsRaised() external view returns (uint256) {
        uint256 totalFunds = 0;
        for (uint256 i = 1; i <= incidentCount; i++) {
            totalFunds += incidents[i].raisedAmount;
        }
        return totalFunds;
    }
}