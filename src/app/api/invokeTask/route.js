import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method === "POST") {
    try {
      // Extract data from the request body (if needed)
      // const requestData = req.body;
      // console.log(requestData, "hello");

      const requestBody = await req.text(); // Read request body as text

      // Log the content of the request body
      console.log("Request Body:", requestBody);
      const requestData = JSON.parse(requestBody);
      console.log("Request Data:", requestData);

      // Define headers with Content-Type
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Stringify the request data (including user_id and task list)
      const raw = JSON.stringify({
        user_id: requestData?.user_id || "default_user_id", // Use default if not provided
        task: requestData?.task || [], // Use an empty array if not provided
      });

      // Define request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      // Make the external API call using fetch
      const response = await fetch(
        //API: TASK MAPPINGS
        "https://vz3v3hxwqd.execute-api.ap-southeast-1.amazonaws.com/dev/postjson",
        requestOptions
      );

      // Parse response as JSON
      const data = await response.json();

      // Send response with the received data or handle errors
      return NextResponse.json(data, { status: response.status || 500 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    // Handle other HTTP methods (optional)
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
