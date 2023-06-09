const mongoose = require('mongoose');

const QuoteItemSchema = mongoose.Schema({
    product: String,
    quantity: Number,
    productAmount: Number,
    productExpense: Number,
    description: String,
    category: String
});

const QuotationSchema = mongoose.Schema({
    quoteItems: [QuoteItemSchema],
    summary: String,
    amount: Number,
    profit: Number,
    expense: Number,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const InvoiceSchema = mongoose.Schema({
    invoiceItems: [QuoteItemSchema],
    summary: String,
    amount: Number,
    profit: Number,
    expense: Number,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});


const CustomerSchema = mongoose.Schema({
    name: String,
    address: String,
    contact: Number,
    rating: Number,
    facilities: [String],
    createdOn: {
        type: Date,
        'default': Date.now
    },
    quotations: [QuotationSchema],
    invoices: [InvoiceSchema],
    gender: String,
    email: String,
    userId: String
});

mongoose.model('Customer', CustomerSchema);