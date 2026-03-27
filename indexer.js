import { createPublicClient, http, parseAbiItem } from 'viem';
import { mainnet } from 'viem/chains';
import 'dotenv/config';

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL),
});

const GOVERNOR_ADDRESS = '0x...';

async function fetchProposals() {
  console.log("Scanning for ProposalCreated events...");

  // Define the event ABI
  const eventAbi = parseAbiItem(
    'event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)'
  );

  // Fetch logs from the last 100,000 blocks
  const logs = await client.getLogs({
    address: GOVERNOR_ADDRESS,
    event: eventAbi,
    fromBlock: 'earliest', // Or a specific block number
  });

  const proposals = logs.map(log => {
    const { proposalId, proposer, description } = log.args;
    return {
      id: proposalId.toString(),
      proposer,
      description,
      blockNumber: log.blockNumber.toString(),
      transactionHash: log.transactionHash,
    };
  });

  console.table(proposals);
  return proposals;
}

fetchProposals().catch(console.error);
