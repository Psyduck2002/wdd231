const params = new URLSearchParams(window.location.search);

const firstName = params.get("first");
const lastName = params.get("last");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

const applicationDetails = document.querySelector("#application-details");

let formattedDate = "Not available";

if (timestamp) {
    const date = new Date(timestamp);

    formattedDate = date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
}

applicationDetails.innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Number:</strong> ${phone}</p>
    <p><strong>Business / Organization:</strong> ${organization}</p>
    <p><strong>Application Date:</strong> ${formattedDate}</p>
`;