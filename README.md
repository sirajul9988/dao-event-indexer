# DAO Event Indexer

This repository solves the "Data Discovery" problem in decentralized governance. Instead of manually searching block explorers, this indexer creates a local or cached database of all DAO activity.

## How it Works
1. **Log Scanning**: Uses `getLogs` to find all `ProposalCreated` and `ProposalExecuted` events.
2. **Data Parsing**: Extracts the `proposalId`, `proposer`, and the `description` string from the event parameters.
3. **State Mapping**: Cross-references IDs to determine if a proposal is currently Active, Defeated, or Executed.

## Use Cases
* **DAO Analytics**: Tracking participation rates over time.
* **Frontend Feed**: Powering the "Proposal History" section of a voting dashboard.
* **Audit Trails**: Providing a verifiable record of governance actions for compliance.
