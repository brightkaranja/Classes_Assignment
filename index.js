//Question 1
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
  }
  
  FeatureToggle.prototype.canAccess = function(userRole) {
    return this.isEnabled && this.userGroupAccess.includes(userRole);
  };
  
  FeatureToggle.prototype.toggleFeature = function(flag) {
    this.isEnabled = !!flag; 
    console.log(`Feature ${this.featureName}' is now ${this.isEnabled ? 'enabled' : 'disabled'}.`);
  };
  
  const featureA = new FeatureToggle("New Dashboard", false, ["betaTesters", "admins"]);
  const user1 = "regularUser";
  const user2 = "betaTesters";
  const user3 = "admins";
  
  console.log(`${user1} can access ${featureA.featureName}: ${featureA.canAccess(user1)}`);
  console.log(`${user2} can access ${featureA.featureName}: ${featureA.canAccess(user2)}`);
  console.log(`${user3} can access ${featureA.featureName}: ${featureA.canAccess(user3)}`);
  
  featureA.toggleFeature(true);
  
  console.log(`${user1} can access ${featureA.featureName}: ${featureA.canAccess(user1)}`);
  console.log(`${user2} can access ${featureA.featureName}: ${featureA.canAccess(user2)}`);
  console.log(`${user3} can access ${featureA.featureName}: ${featureA.canAccess(user3)}`);
  
  function simulateAccess(feature, role) {
    let message;
    if (feature.canAccess(role)) {
      message = `Access granted to ${role} for feature ${feature.featureName}.`;
    } else {
      switch (role) {
        case "regularUser":
          message = `Sorry, ${role} does not have access to ${feature.featureName}'.`;
          break;
        case "betaTesters":
          message = `Access denied for '${role}' to '${feature.featureName}'.`;
          break;
        case "admins":
          message = `Even with admin privileges, '${role}' might not have access to '${feature.featureName}' if it's disabled or not in their group.`;
          break;
        default:
          message = `Unknown role '${role}'. Access to '${feature.featureName}' cannot be determined.`;
      }
    }
    console.log(message);
  }
  
  simulateAccess(featureA, "regularUser");
  simulateAccess(featureA, "betaTesters");
  simulateAccess(featureA, "support");

//Question 2
class TimeLog {
    constructor(freelancerName, projectDetails, logs) {
        this.freelancerName = freelancerName;
        this.projectDetails = projectDetails;
        this.logs = logs;
    }

    calculateTotalEarnings() {
        return this.logs.reduce((total, log) => total + (log.hoursWorked * this.projectDetails.hourlyRate), 0);
    }

    filterLogsByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= start && logDate <= end;
        });
    }

    exceedsWeeklyHours(weekStartDate) {
        const start = new Date(weekStartDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        const weeklyHours = this.logs
            .filter(log => {
                const logDate = new Date(log.date);
                return logDate >= start && logDate <= end;
            })
            .reduce((sum, log) => sum + log.hoursWorked, 0);

        if (weeklyHours > 40) {
            return true;
        } else {
            return false;
        }
    }
}

const project1 = { name: "Website Redesign", hourlyRate: 50 };
const timelog1 = new TimeLog("Daniela", project1, [
    { date: "2024-05-01", hoursWorked: 9 },
    { date: "2024-05-02", hoursWorked: 5 },
    { date: "2024-05-05", hoursWorked: 8 },
    { date: "2024-05-08", hoursWorked: 7 },
]);

console.log(`${timelog1.freelancerName}'s total earnings: $${timelog1.calculateTotalEarnings()}`);
const filteredLogs = timelog1.filterLogsByDateRange("2024-05-01", "2024-05-05");
console.log("Logs within date range:", filteredLogs);
console.log(`Weekly hours exceed 40 (starting 2024-05-05)? ${timelog1.exceedsWeeklyHours("2024-05-05")}`);
console.log(`Weekly hours exceed 40 (starting 2024-04-29)? ${timelog1.exceedsWeeklyHours("2024-04-29")}`);

//Question 3
class Order {
    constructor(customer, items, status) {
      this.customer = customer;
      this.items = items;
      this.status = status;
    }
  
    computeTotalCost() {
      return this.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
    }
  
    updateOrderStatus(paymentStatus) {
      if (paymentStatus === "paid") {
        this.status = "Processing";
        console.log(`Order for ${this.customer.name} is now ${this.status}.`);
      } else if (paymentStatus === "failed") {
        this.status = "Payment Failed";
        console.log(`Payment failed for order from ${this.customer.name}. Status: ${this.status}.`);
      } else {
        console.log(`Order for ${this.customer.name} remains in '${this.status}' status.`);
      }
    }
  
    categorizeOrderUrgency() {
      const totalCost = this.computeTotalCost();
      switch (true) {
        case totalCost > 500:
          return "High Urgency (Large Order)";
        case this.items.length > 5:
          return "Medium Urgency (Multiple Items)";
        case this.status === "Pending":
          return "Low Urgency (Awaiting Payment)";
        default:
          return "Normal";
      }
    }
  }
  
  const customerA = { name: "Joan", email: "joan@example.com" };
  const order1 = new Order(customerA, [
    { productName: "Radio", quantity: 1, unitPrice: 1200 },
    { productName: "Television", quantity: 2, unitPrice: 25 },
  ], "Pending");
  
  console.log(`Total cost for ${customerA.name}'s order: $${order1.computeTotalCost()}`);
  order1.updateOrderStatus("paid");
  console.log(`Order urgency: ${order1.categorizeOrderUrgency()}`);
  
  const order2 = new Order({ name: "Lynne", email: "lynne@testing.com" }, [
    { productName: "Phone", quantity: 10, unitPrice: 1 },
    { productName: "Charger", quantity: 5, unitPrice: 3 },
  ], "Pending");
  console.log(`Order urgency for Lynne: ${order2.categorizeOrderUrgency()}`);

//Question 4
class Employee {
    constructor(id, name, performanceMetrics, feedback) {
        this.id = id;
        this.name = name;
        this.performanceMetrics = performanceMetrics;
        this.feedback = feedback;
    }

    calculateAverageScore() {
        const scores = Object.values(this.performanceMetrics);
        if (scores.length === 0) {
            return 0;
        }
        const sum = scores.reduce((total, score) => total + score, 0);
        return sum / scores.length;
    }

    classifyPerformanceLevel() {
        const averageScore = this.calculateAverageScore();
        if (averageScore >= 4) {
            return "High Performer";
        } else if (averageScore >= 3) {
            return "Meets Expectations";
        } else {
            return "Needs Improvement";
        }
    }

    addFeedback(newFeedback) {
        if (typeof newFeedback === 'string' && newFeedback.trim() !== '') {
            this.feedback.push(newFeedback);
            console.log(`Feedback added for ${this.name}: ${newFeedback}`);
        } else {
            console.log("Invalid feedback provided.");
        }
    }
}
const employee1 = new Employee(101, "Mercy", { communication: 4, efficiency: 5, reliability: 4 }, ["Great job on the last project!"]);
console.log(`${employee1.name}'s average performance score: ${employee1.calculateAverageScore()}`);
console.log(`${employee1.name}'s performance level: ${employee1.classifyPerformanceLevel()}`);
employee1.addFeedback("Continue to excel in team collaboration.");
employee1.addFeedback("");

const employee2 = new Employee(102, "Marion", { communication: 2, efficiency: 3, reliability: 2 });
console.log(`${employee2.name}'s performance level: ${employee2.classifyPerformanceLevel()}`);

//Question 5
class Course {
    constructor(title, instructor, students) {
        this.title = title;
        this.instructor = instructor;
        this.students = students;
    }

    getCompletedStudents() {
        return this.students.filter(student => student.completionStatus === "Completed").map(student => student.name);
    }

    countStudentsByExpertise(expertiseArea) {
        return this.students.filter(student => student.expertise === expertiseArea).length;
    }

    displayInstructorMessage() {
        if (this.students.length > 5) {
            console.log(`${this.instructor.name} (${this.instructor.expertise}): This course '${this.title}' has a good number of students!`);
        } else {
            console.log(`${this.instructor.name} (${this.instructor.expertise}): '${this.title}' currently has a smaller group of students.`);
        }
    }
}


const instructorA = { name: "Mr. Sang", expertise: "Web Development" };
const course1 = new Course("Advanced JavaScript", instructorA, [
    { name: "Fiona", completionStatus: "Completed", expertise: "Frontend" },
    { name: "Neema", completionStatus: "In Progress", expertise: "Backend" },
    { name: "Ushi", completionStatus: "Completed", expertise: "Frontend" },
    { name: "Faith", completionStatus: "Completed", expertise: "Fullstack" },
    { name: "Esther", completionStatus: "In Progress", expertise: "Backend" },
    { name: "Shabach", completionStatus: "Completed", expertise: "Frontend" },
]);

console.log(`Completed students in '${course1.title}': ${course1.getCompletedStudents().join(", ")}`);
console.log(`Number of Frontend students: ${course1.countStudentsByExpertise("Frontend")}`);
course1.displayInstructorMessage();

const instructorB = { name: "Madam Mugane", expertise: "Data Science" };
const course2 = new Course("Introduction to Python", instructorB, [
    { name: "Joanita", completionStatus: "Completed", expertise: "Data Analysis" },
    { name: "Sharon", completionStatus: "In Progress", expertise: "Machine Learning" },
    { name: "Ameer", completionStatus: "Completed", expertise: "Data Analysis" },
]);

course2.displayInstructorMessage();