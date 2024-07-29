import bcrypt from "bcryptjs";
import { mongooseConnection } from "./index.js";
import User from "./models/user.model.js";


//Users to be seeded

const users = [
    { name: 'Student1', email: 'student1@example.com', password: 'password', role: 'student' },
    { name: 'Student2', email: 'student2@example.com', password: 'password', role: 'student' },
    { name: 'Student3', email: 'student3@example.com', password: 'password', role: 'student' },
    { name: 'Student4', email: 'student4@example.com', password: 'password', role: 'student' },
    { name: 'Student5', email: 'student5@example.com', password: 'password', role: 'student' },
    { name: 'Student6', email: 'student6@example.com', password: 'password', role: 'student' },
    { name: 'Student7', email: 'student7@example.com', password: 'password', role: 'student' },
    { name: 'Student8', email: 'student8@example.com', password: 'password', role: 'student' },
    { name: 'Student9', email: 'student9@example.com', password: 'password', role: 'student' },
    { name: 'Student10', email: 'student10@example.com', password: 'password', role: 'student' },
    { name: 'Instructor1', email: 'instructor1@example.com', password: 'password', role: 'instructor' },
    { name: 'Instructor2', email: 'instructor2@example.com', password: 'password', role: 'instructor' },
    { name: 'Instructor3', email: 'instructor3@example.com', password: 'password', role: 'instructor' },
    { name: 'Instructor4', email: 'instructor4@example.com', password: 'password', role: 'instructor' },
    { name: 'Instructor5', email: 'instructor5@example.com', password: 'password', role: 'instructor' },
    { name: 'Admin1', email: 'admin1@example.com', password: 'password', role: 'admin' },
    { name: 'Admin2', email: 'admin2@example.com', password: 'password', role: 'admin' },
  ];


  const seedDB = async () => {
    try {
        await User.deleteMany();

        //hash the passwords
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return new User({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role
            });
        }));

        await User.insertMany(hashedUsers);
        console.log('Database successfully seeded');
        mongooseConnection.close();

    } catch (error) {
        console.log(error);
        mongooseConnection.close();
    }
  }


  seedDB();