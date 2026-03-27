/**
 * Utility to fetch the live state of a proposal 
 * (Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed)
 */
async function getProposalState(client, governorAddress, proposalId) {
  const state = await client.readContract({
    address: governorAddress,
    abi: [{
      name: 'state',
      type: 'function',
      inputs: [{ name: 'proposalId', type: 'uint256' }],
      outputs: [{ name: '', type: 'uint8' }],
    }],
    functionName: 'state',
    args: [proposalId],
  });

  const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
  return states[state];
}
