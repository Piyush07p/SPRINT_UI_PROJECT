document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    // Function to show validation error below the input field
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = message;
        errorElement.style.color = "red";
    }

    // Function to clear validation error
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = "";
    }

    // Consumer Number Validation (Max 13 digits)
    // document.getElementById("consumerNumber").addEventListener("input", function () {
    //     this.value = this.value.replace(/\D/g, ""); // Allow only numbers
    
    //     if (this.value.length > 13) {
    //         this.value = this.value.slice(0, 13); // Limit to 13 digits
    //     }
    // });

    // Full Name Validation (Only Alphabets)
    document.getElementById("fullName").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Remove numbers & special characters
    });

    // Mobile Number Validation (Indian Format)
    document.getElementById("mobileNumber").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // Limit to 10 digits
        }
    });

    // Confirm Password Validation: Ensure it matches Password field
    document.getElementById("confirmPassword").addEventListener("input", function () {
        let password = document.getElementById("password").value;
        let confirmPassword = this.value;
        
        if (password !== confirmPassword) {
            showError(this, "Passwords do not match.");
        } else {
            clearError(this);
        }
    });

    // User ID validation
    document.getElementById("userId").addEventListener("input", function () {
        let userId = this.value.trim();
        if (userId.length < 5 || userId.length > 20) {
            showError(this, "User ID should be 5 to 20 characters long");
        } else {
            clearError(this);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission if validation fails

        // Get form values
        // let consumerNumber = document.getElementById("consumerNumber").value.trim();
        let fullName = document.getElementById("fullName").value.trim();
        let email = document.getElementById("email").value.trim();
        let mobileNumber = document.getElementById("mobileNumber").value.trim();
        let password = document.getElementById("password").value.trim();
        let confirmPassword = document.getElementById("confirmPassword").value.trim();

        let valid = true;

        // // Consumer Number Validation
        // if (consumerNumber.length !== 13) {
        //     showError(document.getElementById("consumerNumber"), "Please enter a valid Consumer Number.");
        //     valid = false;
        // } else {
        //     clearError(document.getElementById("consumerNumber"));
        // }

        // Full Name Validation
        if (!/^[A-Za-z\s]{1,50}$/.test(fullName)) {
            showError(document.getElementById("fullName"), "Full Name should contain only alphabets.");
            valid = false;
        } else {
            clearError(document.getElementById("fullName"));
        }

        // Email Validation
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(document.getElementById("email"), "Invalid email format.");
            valid = false;
        } else {
            clearError(document.getElementById("email"));
        }

        // Mobile Number Validation
        let mobileRegex = /^[6-9][0-9]{0,9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            showError(document.getElementById("mobileNumber"), "Enter a valid 10-digit mobile number (starting with 6-9).");
            valid = false;
        } else {
            clearError(document.getElementById("mobileNumber"));
        }

        // Password Validation
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            showError(document.getElementById("password"), "Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
            valid = false;
        } else {
            clearError(document.getElementById("password"));
        }

        // Confirm Password Validation
        if (password !== confirmPassword) {
            showError(document.getElementById("confirmPassword"), "Passwords do not match.");
            valid = false;
        } else {
            clearError(document.getElementById("confirmPassword"));
        }
      
        

        // If all validations pass, show success message
        if (valid) {
            let customerId = Math.floor(100000 + Math.random() * 900000); // Random 6-digit ID
            let confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.style.display = "block";
            confirmationMessage.innerHTML = `<strong>Registration Successful!</strong> <br> 
                                             <b>Customer ID:</b> ${customerId} <br> 
                                             <b>Name:</b> ${fullName} <br> 
                                             <b>Email:</b> ${email}`;
                                           
            form.reset();
        }
    });
});
