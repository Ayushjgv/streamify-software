import axios from "axios";

// Using the example query "one piece".
const url = "https://api.consumet.org/anime/hianime/one%20piece";
const data = async () => {
 try {
 const { data } = await axios.get(url, { params: { page: 1 } });
 console.log(data);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

data();

