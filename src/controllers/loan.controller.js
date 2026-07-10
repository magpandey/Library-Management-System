import { Item } from "../models/Item.model.js";
import { Customer } from "../models/Customer.model.js";
import { Loan } from "../models/Loan.model.js";
import { CUSTOMER_DISCOUNTS, FEE_RULES } from "../config/feeRules.js";

async function checkoutItem(req, res) {
  try {
    const { itemId, customerId, daysBorrowed } = req.body;

    if (!itemId || !customerId || !daysBorrowed) {
      return res.status(400).json({ message: `Provide all the crediantials` });
    }

    const item = await Item.findById(itemId);

    if (!item || item.isCheckedOut) {
      return res
        .status(400)
        .json({ message: `Item not available for checkout` });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: `Customer not found` });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(daysBorrowed));

    const newLoan = await Loan.create({
      itemId: item._id,
      customerId: customer._id,
      issueDate: new Date(),
      dueDate,
    });

    item.isCheckedOut = true;
    item.currentLoanId = newLoan._id;

    await item.save();

    return res
      .status(201)
      .json({ message: `|Checked out successfully `, loan: newLoan });
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
}

async function returnItem(req, res) {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res
        .status(401)
        .json({ message: `Provide the Neccessary information` });
    }

    const item = await Item.findById(itemId);

    if (!item || !item.isCheckedOut) {
      return res
        .status(401)
        .json({ message: `Cannot return a non issued item` });
    }

    const loan = await Loan.findOne({
      $and: [{ itemId: itemId }, { returnDate: null }],
    });

    if (!loan) {
      return res
        .status(500)
        .json({ message: `Unable to retreive the Loan info` });
    }

    const customer = await Customer.findById(loan.customerId);

    if (!customer) {
      return res.status(404).json({ message: `Customer not found` });
    }

    const returnedDate = new Date();
    const lateFeePerDay = FEE_RULES[item.type].lateFeePerDay;
    const discountMultiplier = CUSTOMER_DISCOUNTS[customer.customerType];

    const daysLate = Math.ceil(
      (returnedDate - loan.dueDate) / (1000 * 60 * 60 * 24),
    );


    const lateFee =
      daysLate > 0 ? daysLate * lateFeePerDay * discountMultiplier : 0;

      loan.returnDate = returnedDate;
      loan.lateFeeCharged = lateFee;

      await loan.save();
    
      item.isCheckedOut = false;
      
      item.currentLoanId = null;

      await item.save();

      return res.status(200).json({message:`Item returned successfully`,lateFee})


  } catch (error) {
    return res
      .status(500)
      .json({ message: `Can'nt provide return feature for now` });
  }
}
export { checkoutItem, returnItem };
