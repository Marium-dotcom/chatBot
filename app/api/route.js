
  
  export async function POST(req) {
    const { optionLOW } = await req.json();
   console.log(optionLOW);
    // Dummy data to simulate bot responses
    const botResponses = {
      "menu exploration": "Here are the menu details... 🍔🍕🍣",
      "specials announcement": "Check out our latest specials... 🌟🎉",
      "reserve": "You can reserve a table by... 📅🍽️",
      "feedback": "We appreciate your feedback. Please let us know... 🤗📝"
    }

    // https://i.ibb.co/V3GqcF3/Screenshot-2023-11-24-045314.png

    const botResponse = botResponses[optionLOW] 
   console.log(botResponse);
    return new Response(JSON.stringify(botResponse), { status: 201 })

  }


