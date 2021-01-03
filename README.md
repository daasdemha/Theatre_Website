
# Codio Dynamic Website Template

To download and configure a copy of this template code for your assignment open your Codio box, locate the Terminal and run the following commend:

```shell
$ curl -sL https://bit.ly/2TJtxjF | sudo -E bash -
```
# iftikhars-sem1

heroku:

To open heroku: https://infinite-sea-93450.herokuapp.com/

Testing

The following accounts have been created to allow the system to be tested. All accounts have the password p455w0rd:

    user1
    user2
    user3

The things ive compleated in this project

Stage 1

The core functionality consists of three screens:
Part 1

The home screen should be visible even if the user is not logged in and needs to display the current play being performed, each should display:

    The name of the show
    A thumbnail of the poster
    The date of the first performance (formatted as DD MONTH, eg. 20 June)
    The date of the last performance (formatted as DD MONTH, eg. 30 June)

Part 2

Clicking on either the poster thumbnail or name should display the full details of that play including the dates and times of the performances.

    A photo of the performance.
    The name of the play.
    A detailed, multi-line, formatted description of the play.
    A detailed, multi-line cast list.
    A list of the 10 performances (date plus either "matinee" or "evening")
    A note of how many tickets are left from each performance
    The cost per ticket in GBP.

If the user is logged in there should be a link or button next to any performance where there are still spaces. Clicking this adds a ticket for that performance to the shopping cart. The page should display:
Part 3

If the user is logged in there should be a link or button on both the home and details screens to take the user to their shopping cart where they can:

    See the cost per show and total cost.
    Change the ticket quantity for each performance.
    Delete all the tickets for a particular performance.
    Clear the shopping cart entirely.

Stage 2

The intermediate tasks require you to make changes to the functionality:

    The theatre plan productions over the next three months meaning they know the current production and also the next two productions coming up. The home page should now display both the current production and the two that will follow.
    The tickets are in three price bands reflecting where in the auditorium they are. There are a fixed number of each type and fir each production the customer should be able to add a mix of all three types to their order and the production details screen should show how many are remaining: 2. Rear Stalls: these seats are located towards the rear of the main auditorium. 3. Circle: these are located in the balcony placed above the rear stalls, they cost 50% more then the rear stalls.
        Front Stalls: these are the most expensive (best seats in the house) and are located towards the front of the main auditorium. They cost twice as much as the rear stalls.
