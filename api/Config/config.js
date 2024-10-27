const dbName = 'questionAndAnswer';
const dbUser = "muthu861997";
const dbPwd = "OqLER7d6cwNPzstl";
let dbCluster = "cluster0.frjy8.mongodb.net/";

module.exports = {
	dbName: dbName,
	dbconnection: `mongodb+srv://${dbUser}:${dbPwd}@${dbCluster}${dbName}`,
	port: 3008,
	passPhrase: 'T1Bt0Lx5jPu5L6AJ8523IAv0anRd03Ya',
	algorithm: 'aes-256-ctr',
	iv: 'bLMjTTIuNUpWe345',
	jwtTokenCustomers: 'userExPan',
}