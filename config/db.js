const mongoose = require('mongoose');

const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ DB connection error:', error);
  }
};

module.exports = DBconnection;
