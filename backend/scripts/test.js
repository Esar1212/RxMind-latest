import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: "postgresql://postgres.crbwlcaqzgjekdlhjbvn:RxMind_RxWings@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
});

client.connect()
  .then(() => console.log("Connected!"))
  .catch(err => console.error("Connection error:", err))
  .finally(() => client.end());
