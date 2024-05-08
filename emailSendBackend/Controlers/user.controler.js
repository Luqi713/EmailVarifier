const { sendEmail } = require("../Models/EmailSender");
const { inActivateUser } = require("../Models/user.models");

module.exports.CreateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await inActivateUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const registrationCode = Math.floor(100000 + Math.random() * 900000);
    sendEmail(email, registrationCode);

    const newUser = new inActivateUser({
      email,
      password,
      verificationCode: registrationCode,
      isActive: false,
    });
    await newUser.save();
    res.status(200).json({ message: "Registration code sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.ActivateUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await inActivateUser.findOne({ email, verificationCode });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    user.isActive = true;
    await user.save();
    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await inActivateUser.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    if (user.isActive === false) {
      return res.status(200).json({ message: "Email not verified!" });
    }

    return res.status(200).json({ message: "Login Successfully!", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
