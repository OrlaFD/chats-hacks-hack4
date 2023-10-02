const fetch = require('node-fetch');
const { app } = require('@azure/functions');

app.http('httpTriggerApiIntensity', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const response = await fetch('https://api.carbonintensity.org.uk/intensity/date');
        const data = await response.json();

        const intensityLevel = data.data[0].intensity.actual;

        if (intensityLevel > 500) {
            // Disable the set of equipment
            disableEquipment();
            return { body: 'The set of equipment has been disabled.' };
        } else {
            // Enable the set of equipment
            enableEquipment();
            return { body: 'The set of equipment has been enabled.' };
        }
    }
});

function enableEquipment() {
    // Code to enable the set of equipment
}

function disableEquipment() {
    // Code to disable the set of equipment
}