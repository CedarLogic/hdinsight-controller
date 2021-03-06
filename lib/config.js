var config = {
  clientId: ensureValue('servicePrincipalClientId'),
  secret: ensureValue('servicePrincipalSecret'),
  domain: ensureValue('servicePrincipalDomain'),
  subscriptionId: ensureValue('servicePrincipalSubscriptionId'),

  resourceGroupName: ensureValue('resourceGroupName'),
  clusterName: ensureValue('clusterName'),
  proxyAppName: ensureValue('proxyAppName'),
  location: ensureValue('location'),
  clusterApiVersion: ensureValue('clusterApiVersion'),
  tags: ensureValue('tags', JSON.parse),
  clusterVersion: ensureValue('clusterVersion'),
  osType: ensureValue('osType'),
  clusterType: ensureValue('clusterType'),
  clusterLoginUserName: ensureValue('clusterLoginUserName'),
  clusterLoginPassword: ensureValue('clusterLoginPassword'),

  clusterStorageAccountName: ensureValue('clusterStorageAccountName'),
  clusterStorageAccountKey: ensureValue('clusterStorageAccountKey'),

  inputQueueName: ensureValue('inputQueueName'),
  sendAlertUrl: ensureValue('sendAlertUrl'),
  jobExecutionIntervalInSeconds: ensureValue('jobExecutionIntervalInSeconds', parseInt),

  clusterNodeSize: ensureValue('clusterNodeSize'),
  clusterWorkerNodeCount: ensureValue('clusterWorkerNodeCount', parseInt),
  sshUserName: ensureValue('sshUserName'),
  sshPassword: ensureValue('sshPassword')
};

// Ensure a value from the environment variables and ensure parsing in case needed
function ensureValue(name, parseHandler) {
  if (!process.env.hasOwnProperty(name)) {
    throw new Error('Could not find value for ' + name);
  }

  if (typeof parseHandler !== 'function') {
    return process.env[name]
  }

  try {
    return parseHandler(process.env[name]);
  } catch (e) {
    throw new Error('Could not parse value for ' + name + '\n' + e.message);
  }
}

module.exports = config;