# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Design:** 
    _Assumptions_:
        1. Facilities will have an id and the details of the facility
        2. Agents will have a default id and their personal details
        3. Agents can work in multiple facilities (morning shift in facility A and night in facility B)
        4. Shift has a relationship between facilities and agents. It will contain the shift details along with time, facilities id and agents id
        5. One agent can have multiple id's created by facilities.

    Solution:
        1. a facility should be able to enter the custom id's for the agent on the frontend
        2. we need to save these id's in the database.
        3. retreive these ids while generating a report.

**Tasks**:

Create a table for storing custom ids for each agent per facility (2 story pts, 1 - Dev, 1 - QA)
    - Table name: customAgentIds
    - Columns: ID, facilityId, agentId, customId
    - Create index on facilityId & agentId

Create an index on agentId in Shifts table (1 story pt, 0.5 - Dev, 0.5 - QA)
    - getShiftsByFacility function now filters on facitlityId
    - we will need it to get customAgentIds by filtering on agentIds in the Shifts table

Modify the getShiftsByFacility function (3 story pts)
    - Function should return customAgentIds as the agentIds
    - It should retrieve the customAgentIds from the customAgentIds table based on internal agentId
    - If customAgentIds not available, return the existing internal database id

Get the list of AgentIds who has worked shift under a facility (For frontEnd to use) (2 story pts, 1 - Dev, 1 - QA)
    - Create a GET API call to retrieve list of agents who worked shifts for a facility

Insert new custom Agent Ids to the customAgentId table (For Frontend use) (3 story pts, 2 - Dev, 1 - QA)
    - Create a POST API to accept new customIds for each agent returned from the above call
    - The API call should store the new customIds into the customAgentIds table

UI task (3 story pts, 2 - Dev, 1 - QA)
    - Get all the list of agents, by passing facilityId to the GET api call
    - Create a text field to accept new customAgentId
    - On submit, pass the agentId, facilityId and the customAgentId using the POST API call