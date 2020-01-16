# Grail

Now Live! https://grail-sei.herokuapp.com/grails

Grail was created to share great things and find great things in return. The idea behind Grail is based off of "holy grails", a popular video series on youtube, where beauty gurus would share their all time favourite products of any given beauty category. But why limit favourites to beauty? Grails allows people to share things in their life that they have no replacement for. Things that they love, give them comfort or solely for it's quality and experience. As a result of sharing a person's love, it provides a deeper look into a person's interests and allows one to find like-minded people. Connecting people one love at a time.

### Technologies Used

- Javascript, Node.js, Express, MongoDb, Mongo Atlas, EJS, HTML/CSS, Bulma, Passport, Google OAuth, Heroku

### Getting Started

Main page displays all existing grails from all users in the form of 'grail cards'. Grail cards show the user, the category they posted, and their holy grails/favourites under that category.

<img src="/images/main_page.png" alt="main_page" style="zoom:33%;" />

You can filter the shown grails by typing in a Category or User in the stop search bar. 
Clicking on the bar will show a dropdown of all existing categories, or you can start typing a category to see if it exists.

<img src="/images/search_bar.png" alt="search_bar" style="zoom:40%;" />

Filtering by Category will also display a tally of the chosen grails in the category, ranking them from most to least popular!

<img src="/images/category_page.png" alt="category_page" style="zoom:33%;" />

Signed in users will see a '+' button on the bottom of their screen which allows them to add grails.
Clicking on the input bar allows you to see existing categories and grails, coercing the user to pick categories/grails that already exist.
You may also create a new category/grail.

<img src="/images/form_page.png" alt="form_page" style="zoom:33%;" />

The user's page allows the user to change their displayed username as well as avatar.
They can also view their grails, delete individual grails, delete entire cards, or update individual grails.

<img src="/images/user_page.png" alt="user_page" style="zoom:33%;" />

### Next Steps

- Functionality for users to follow certain categories or other users - further customizing only categories/grails/users that align with their interests

- Make grail cards clickable 

  - Redirected to a details page with the grails description, image of grail, comments

- Leave likes on other user's grail cards

- On the add grail form - when a category is chosen, the grails will only display available grails under that category(not all existing grails)

  