
const list = ['B','D','F','J','L','N', 'R','T','V', 'Z', 'AB', 'AD', 'AH', 'AJ', 'AL', 'AP', 'AR', 'AT', 'AX', 'AZ', 'BB'];
const result = [];

for (let i = 0; i < list.length; i++) {
  result.push(`${list[i]}3:${list[i]}50`);
}


module.exports = result