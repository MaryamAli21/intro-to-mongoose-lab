//---------modul import----------
const dotenv = require('dotenv').config();
const prompt = require('prompt-sync')();


// ---------- Connection-----------------
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB on ${mongoose.connection.name}`);
});

// --------------------queries.js-------------------------

app.get("/", (req, res) => {
    res.send('<h2>welcome to the crm database!</h2>');
});

const Init = () => {
    promptFunction();
};

const promptFunction = () => {
    console.log("1 Create a new Customer")
    console.log("2 View all Customers")
    console.log("3 Update a preexisting Customer")
    console.log("4 Delete a Customer")
    console.log("5 Quit ")

    const option = prompt("What would you like to do? select an option!");
    switch (choice) {
        case '1':
           createCustomer();
          break;
        case '2':
           viewCustomers();
          break;
        case '3':
           updateCustomer();
          break;
        case '4':
           deleteCustomer();
          break;
        case '5':
            console.log('Quit..');
          return;
        default:{
          console.log('Invalid input . return to menu.');
          Menu();}
      }
    }

const nextPrompt = () => {
    const nextPrompt = prompt('for Returning to the Menu enter 6   ')
    if(nextPrompt === '6') {
        promptFunction();
    } else {
        console.log('Invalid input, Enter 6 to return to the Menu...')
        promptFunction(); 
    };
};



const createCustomer= async() =>{
    const name = prompt('Enter the customer name: ');
    const age = prompt('Enter the customer age: ');
  
    const customer =  Customer.create({ name, age });

    console.log('Customer created successfully.');
}
    nextPrompt();

    const viewCustomers= async() =>{
        const customers = await Customer.find({});
          console.log('Customers:');
          customers.forEach((customer) => {
            console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
          });
        } 

        const updateCustomer= async() =>{
            const customers = await Customer.find({});
           
          console.log('This is the list of customers:');
          customers.forEach((customer) => {
            console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
          });
        
          const customerId = prompt('Enter the id of the customer to update:');
          const customer = await Customer.findById(customerId);
        
          const newName = prompt(`What is the customers new name? (current: ${customer.name})`);
          const newAge = prompt(`What is the customers new age? (current: ${customer.age})`);
        
        
          await Customer.create({newName, newAge});
        
          console.log('Updated Customers List.');
          customers.forEach((customer) => {
            console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
          });
        }

    nextPrompt();


    const deleteCustomer= async() =>{
        const customers = await Customer.find({});
        console.log('This is the list of customers:');
        customers.forEach((customer) => {
          console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
        });
    
        const customerId = prompt('Enter the id of the customer to delete: ');
        await Customer.findByIdAndDelete(customerId);
        console.log('Customer deleted successfully.');
        
        console.log('Updated Customers List.');
        customers.forEach((customer) => {
          console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
        });
      }

const quitFunction = () => {
    console.log('Quitting...');
    mongoose.connection.close();
};

Init();