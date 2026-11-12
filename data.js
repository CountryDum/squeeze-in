/* ------------------------------------------------------------------
   Squeeze-In site content. Edit this file to change the menu, hours,
   and gallery. No other file needs to change.
------------------------------------------------------------------- */

const SITE = {
  phone: '(541) 575-1045',
  phoneHref: 'tel:+15415751045',
  timeZone: 'America/Los_Angeles',

  // Optional: paste a form endpoint (for example a Formspree URL) and
  // pickup orders will be sent to the restaurant automatically.
  // While empty, the site shows the order summary and asks the guest to call.
  orderEndpoint: '',

  // 0 = Sunday ... 6 = Saturday. 24-hour times.
  hours: [
    { day: 'Sunday',    open: '06:00', close: '19:00' },
    { day: 'Monday',    open: '06:00', close: '20:00' },
    { day: 'Tuesday',   open: '06:00', close: '20:00' },
    { day: 'Wednesday', open: '06:00', close: '20:00' },
    { day: 'Thursday',  open: '06:00', close: '20:00' },
    { day: 'Friday',    open: '06:00', close: '20:00' },
    { day: 'Saturday',  open: '06:00', close: '20:00' },
  ],
};

/* Gallery. To add a photo: drop the file in /images and add a line
   { src: "images/your-photo.jpg", caption: "What it shows" }.
   Everything in images/stock is a PLACEHOLDER stock photo, to be swapped
   for the restaurant's own photos. `small: true` marks low-resolution
   photos that should only be shown at thumbnail size. */
const GALLERY = [
  { src: "images/stock/breakfast.jpg",      caption: "The Classic" },
  { src: "images/stock/burger.jpg",         caption: "Famous burgers" },
  { src: "images/stock/pie.jpg",            caption: "Homemade pie" },
  { src: "images/stock/diner.jpg",          caption: "Grab a booth" },
  { src: "images/stock/pancakes.jpg",       caption: "Tutti frutti pancakes" },
  { src: "images/stock/coffee.jpg",         caption: "Coffee's on" },
  { src: "images/stock/deck.jpg",           caption: "Out on the deck" },
  { src: "images/stock/benedict.jpg",       caption: "Eggs Benedict" },
  { src: "images/stock/steak-fries.jpg",    caption: "Rib eye, hand cut" },
  { src: "images/stock/french-toast.jpg",   caption: "French toast" },
  { src: "images/stock/hills.jpg",          caption: "Grant County" },
  { src: "images/stock/club.jpg",           caption: "The Club" },
  { src: "images/stock/cinnamon-rolls.jpg", caption: "Cinnamon rolls" },
  { src: "images/stock/milkshake.jpg",      caption: "Milkshakes" },
  { src: "images/stock/omelet.jpg",         caption: "Three-egg omelets" },
  { src: "images/stock/pie-slice.jpg",      caption: "A slice to finish" },
  { src: "images/squeeze-in-cc-1.jpg",      caption: "Our home in Canyon City", small: true },
  { src: "images/squeeze-in-cc-3.jpg",      caption: "Cheeseburger with house fries", small: true },
];

/* Menu. Add `price: 9.5` to any item to show a price and a running
   total in the pickup order. */
const MENU = [
  {
    id: 'breakfast', label: 'Breakfast', icon: 'egg_alt',
    note: 'Served all day.',
    groups: [
      {
        name: 'Specialties',
        note: 'Served with hashbrowns and your choice of toast, biscuit, English muffin or cakes, unless noted.',
        items: [
          { n: 'The Basic *', d: 'Two eggs, served with hashbrowns and toast.' },
          { n: 'Mini Breakfast *', d: 'One egg, hashbrowns, two slices of bacon and toast.' },
          { n: 'The Classic *', d: 'Two eggs any style with your choice of ham, bacon, sausage, polish or turkey sausage patty.' },
          { n: 'Eggs Benedict *', d: 'English muffin, two poached eggs and ham covered in hollandaise, with hashbrowns.' },
          { n: 'Corned Beef Hash', d: 'Our own hash topped with two eggs.' },
          { n: 'Big Country Fried Steak', d: 'Chopped beef steak, breaded, fried to perfection and smothered in country gravy, with two eggs any style.', tag: 'Favorite' },
          { n: 'Breakfast Burrito', d: 'Scrambled eggs, cheddar-jack and your choice of ham, bacon or sausage in a flour tortilla, with salsa and hashbrowns.' },
          { n: 'Rib Eye Steak *', d: 'A tender hand-cut steak and two eggs any style.' },
          { n: 'Pork Chop *', d: 'One tender pork chop.' },
          { n: 'Hamburger Steak *', d: '8 oz hamburger steak topped with grilled onions and mushrooms, with two eggs any style.' },
          { n: 'Denver Sandwich', d: 'Scrambled eggs, ham, green peppers, grilled onions and cheddar-jack on your choice of toast, with hashbrowns.' },
          { n: 'Breakfast Sandwich', d: 'Scrambled egg, melted cheddar and your choice of bacon, sausage or ham on a toasted muffin, with hashbrowns.' },
        ],
      },
      {
        name: 'Omelets & Scrambles',
        note: 'Three eggs as an omelet or scramble, with hashbrowns and your choice of toast, biscuit, English muffin or two pancakes. Half orders available.',
        items: [
          { n: 'Denver', d: 'Ham, grilled onions, peppers and cheddar-jack.' },
          { n: 'Road Kill (Just Kidding)', d: 'Ham, bacon, sausage, mushrooms, peppers, onion, tomatoes and cheddar-jack.' },
          { n: 'Hog Wild', d: 'Ham, bacon, sausage and cheddar-jack.' },
          { n: 'Western', d: 'Sausage, bacon, peppers, onions and cheddar-jack, topped with country gravy.' },
          { n: 'Fresh Garden', d: 'Mushrooms, onions, peppers, tomatoes and cheddar-jack.', tag: 'Vegetarian' },
          { n: 'Mexi', d: 'Ham or beef, green chili and cheddar-jack, with sour cream and salsa on the side.' },
          { n: 'Philly Cheesesteak Omelet', d: 'Grilled prime rib, bell peppers, sauteed mushrooms and melted Swiss.' },
          { n: 'Bacon, Tomato & Cheese' },
          { n: 'Mushrooms & Swiss', tag: 'Vegetarian' },
          { n: 'Ham & Swiss' },
          { n: 'Three Cheese', tag: 'Vegetarian' },
          { n: 'Sausage & Cheddar-Jack' },
          { n: "Pete's Special", d: 'Diced ham and hashbrowns with onions, cheese on top and two fried eggs to finish. Comes with a side of gravy and toast or pancakes.' },
        ],
      },
      {
        name: 'From the Griddle',
        items: [
          { n: 'Buttermilk Pancakes *', d: 'Three cakes, or a short stack of two.' },
          { n: 'Tutti Frutti Pancakes', d: 'Your choice of blueberries, strawberries or raspberries, with whipped cream.' },
          { n: 'Pecan Pancakes', d: 'Two pancakes with pecans cooked inside, served with butter and syrup.' },
          { n: 'Golden Belgian Waffle', d: 'Plain, or with raspberries, blueberries or strawberries and whipped cream.' },
          { n: 'All You Can Eat Pancakes *' },
          { n: 'French Toast *' },
          { n: 'Hashbrowns & Gravy *', d: 'On its own, or with two eggs and your choice of meat.', tag: 'Favorite' },
          { n: 'Biscuits & Gravy *', d: 'On its own, or with two eggs and your choice of meat.', tag: 'Favorite' },
          { n: "Red's Specialty", d: 'One biscuit and gravy with a half order of hashbrowns and gravy.' },
          { n: 'Corned Beef Hash Benedict *', d: 'English muffin with corned beef, two eggs and hollandaise, with hashbrowns.' },
          { n: 'Chicken Fry Benedict *', d: 'Half a chicken fry on an open biscuit with two eggs, covered in country gravy, with hashbrowns.' },
        ],
      },
      {
        name: 'Extras',
        items: [
          { n: 'Egg', d: 'One or two.' },
          { n: 'Toast, Biscuit or Muffin' },
          { n: 'Breakfast Meat', d: 'Bacon, sausage links, sausage patty or polish sausage.' },
          { n: 'Ham' },
          { n: 'Hashbrowns' },
          { n: 'Fresh Fruit Cup', d: 'Seasonal.' },
          { n: 'Fruit & Cottage Cheese' },
          { n: 'Cinnamon Roll' },
          { n: 'Oatmeal or Cream of Wheat', d: 'With raisins, brown sugar and toast. Cup or bowl.' },
          { n: 'Blueberry Oatmeal', d: 'Served with toast. Cup or bowl.' },
        ],
      },
    ],
  },
  {
    id: 'lunch', label: 'Lunch', icon: 'lunch_dining',
    note: 'Available all day.',
    groups: [
      {
        name: 'Squeeze-In Famous Burgers',
        note: 'Served with lettuce, tomato, onions, dill relish and mayo, plus your choice of soup, salad, fries, macaroni, potato salad or tater tots. Swap in chicken, turkey or a garden patty.',
        items: [
          { n: 'Cheeseburger *', d: 'Add ham or bacon if you like.', tag: 'Favorite' },
          { n: 'Bacon Avocado Cheeseburger *' },
          { n: 'Jalapeno Pepper Jack *', d: 'Fresh jalapeno slices and melted pepper jack on a juicy burger.' },
          { n: 'Mushroom Swiss *' },
          { n: 'Mexi Burger *', d: 'Green chili, sliced avocado and melted Swiss.' },
          { n: 'Pineapple Swiss Burger *', d: 'Grilled pineapple and melted Swiss on a juicy burger.' },
          { n: 'Grilled Onion Burger *' },
        ],
      },
      {
        name: 'Old Fashioned Sandwiches',
        note: 'Served with soup, green salad, macaroni, potato salad, homemade fries or tater tots, unless noted.',
        items: [
          { n: 'Reuben', d: 'Pastrami, Swiss and sauerkraut on grilled rye.', tag: 'Favorite' },
          { n: 'Club', d: 'Triple decker with ham, turkey, crispy bacon, Swiss, cheddar, lettuce, tomato and mayo on toasted whole wheat.' },
          { n: 'Patty Melt', d: 'Grilled rye with melted Swiss, 1000 island and grilled onions.' },
          { n: 'Squeeze French Dip', d: 'Tender sliced roast beef on a sub bun, served au jus. Add grilled onion or cheese.' },
          { n: 'Philly Squeeze Steak', d: 'Prime rib, grilled onions, peppers and cream cheese.' },
          { n: 'Turkey Melt', d: 'Sliced turkey with crispy bacon, tomatoes and melted Swiss on grilled sourdough.' },
          { n: 'Maui Wowi', d: 'Ham, brown sugar, cloves, pineapple, Swiss and mayo, heated and topped with lettuce, vinegar and oil.' },
          { n: 'Gobbler', d: 'Turkey, cream cheese, cranberry sauce and lettuce.' },
          { n: 'Veggie Delight', d: 'Cream cheese, fresh avocado, mushrooms, crisp lettuce and juicy tomato.', tag: 'Vegetarian' },
          { n: 'BLT', d: 'Crispy bacon, fresh lettuce and tomato. Add avocado for a BLTA.' },
          { n: 'Fish Burger', d: 'Hand-breaded fish fillets, deep fried and served on a grilled bun.' },
          { n: 'BBQ Pulled Pork or Beef Sandwich', d: 'Smothered in BBQ sauce, topped with coleslaw, on a light baked bun.' },
          { n: 'Hot Roast Beef Sandwich', d: 'Open faced with mashed potatoes and brown gravy, and your choice of soup or salad.' },
          { n: 'Build Your Own Sandwich', d: 'Your choice of bread or a sub roll stacked with beef, ham, turkey or pastrami and cheddar, American, Swiss or pepper jack. Whole or half.' },
          { n: 'Chicken Strip Sub', d: 'Lettuce, tomato and Swiss.' },
        ],
      },
      {
        name: 'Wraps',
        items: [
          { n: 'BLTA Wrap', d: 'Turkey, bacon, lettuce, tomato and avocado.' },
          { n: 'Spicy Turkey Wrap', d: 'Turkey, green chili, cheddar, pepper jack, tomato and bacon.' },
          { n: 'Caesar Chicken Wrap', d: 'Chicken breast, parmesan, tomato, romaine mix and Caesar dressing.' },
        ],
      },
      {
        name: 'Favorite Baskets',
        note: 'Served with grilled bread and one choice of soup, salad, fries, macaroni, potato salad or tater tots. Lighter portions available.',
        items: [
          { n: 'Hand Cut & Battered Fish Fillets' },
          { n: 'Chicken Strips' },
          { n: 'Finger Steaks' },
          { n: 'Butterfly Shrimp' },
          { n: 'Clam Strips' },
        ],
      },
      {
        name: 'Salads & Soups',
        note: 'Dressings: ranch, honey mustard, bleu cheese, Italian, French or 1000 island. Half salads available.',
        items: [
          { n: 'Cobb Salad', d: 'Chicken or shrimp with bacon, avocado, hard boiled egg, tomatoes and olives over salad greens.' },
          { n: 'Honey Mustard Chicken Salad', d: 'Grilled or crispy chicken, bacon, cheddar-jack, olives and tomatoes over salad greens.' },
          { n: 'Santa Fe Salad', d: 'Mesquite grilled chicken breast, cheddar-jack, tomatoes and olives with sweet chili dressing.' },
          { n: 'Our Famous Taco Salad', d: 'Lettuce, 1000 island, chicken or taco meat, cheddar-jack, beans, tomatoes, olives, sour cream and salsa.', tag: 'Favorite' },
          { n: 'Chef Salad', d: 'Ham, turkey, cheddar-jack, tomatoes and hard boiled egg over fresh greens.' },
          { n: 'House Salad' },
          { n: 'Homemade Soup', d: 'Cup or bowl. Ask about today\'s soup.' },
          { n: 'Soup, Salad & Bread' },
        ],
      },
      {
        name: 'Appetizers & Sides',
        items: [
          { n: 'Quesadilla', d: 'BBQ pulled pork, grilled chicken or ground beef with cheddar-jack in a flour tortilla with a crispy parmesan crust.' },
          { n: 'Nachos Grande', d: 'Tortilla chips smothered with cheddar-jack, olives, tomatoes, sour cream and salsa. Add chicken, ground beef or pulled pork.' },
          { n: 'Appetizer Platter', d: 'Onion rings, stuffed crowns, mozzarella sticks and mushrooms. Small or large.' },
          { n: 'Onion Rings', d: 'Served with ranch.' },
          { n: 'Mozzarella Sticks', d: 'Lightly battered and deep fried, with ranch.' },
          { n: 'Mushrooms', d: 'Lightly breaded and deep fried, with ranch.' },
          { n: 'Deep Fried Vegetables', d: 'Green beans, zucchini or pickles.' },
          { n: 'Stuffed Crowns', d: 'Tater sticks stuffed with cheddar and jalapenos.' },
          { n: 'Chips & Salsa' },
          { n: 'Tater Tots, Curly or House Fries' },
          { n: 'Sweet Potato Fries' },
        ],
      },
    ],
  },
  {
    id: 'dinner', label: 'Dinner', icon: 'dinner_dining',
    note: 'Dinner entrees start at 4 pm.',
    groups: [
      {
        name: 'Entrees',
        note: 'Served with bread, vegetables, homemade soup or salad, and a baked potato, mashed potatoes, french fries or tater tots, unless noted.',
        items: [
          { n: 'Holy Cow Rib Eye Steak *', d: '14 oz hand-cut rib eye, cooked the way you like it. Ask about adding sauteed garlic shrimp or butterfly shrimp.' },
          { n: 'Top Sirloin *', d: '10 oz sirloin served with four dinner shrimp.' },
          { n: 'Big Country Fried Steak', d: 'Tender chopped steak, breaded, fried to perfection and covered in country gravy. Be prepared to be full. Small order available.', tag: 'Favorite' },
          { n: 'Hamburger Steak *', d: '8 oz hamburger steak topped with grilled onions, mushrooms and brown gravy.' },
          { n: 'Pork Chop Dinner', d: 'Two country pork chops, seasoned and grilled. Or make it a ham steak.' },
          { n: 'Up the River Grilled Salmon Dinner', d: 'Two grilled salmon fillets with garlic toast and veggies.' },
          { n: 'Seafood Combo', d: 'Fish fillets, golden clam strips and crispy butterfly shrimp, with cocktail and tartar sauce.' },
          { n: '"Fowl" Food', d: 'A pair of grilled chicken breasts: parmesan, herb, naked, teriyaki or sweet chili.' },
          { n: 'Chicken Parmesan', d: 'Chicken breast breaded with parmesan bread crumbs, topped with marinara and parmesan.' },
          { n: 'Shrimp or Chicken Alfredo', d: 'With your choice of soup or salad. Smaller portion available.' },
          { n: 'Spaghetti & Meatballs', d: 'Served with salad and garlic bread.' },
          { n: 'Friday Night Prime Rib', d: 'A 10 oz or 12 oz cut. Fridays only, while it lasts.', tag: 'Fridays' },
        ],
      },
    ],
  },
  {
    id: 'sweets', label: 'Sweets & Drinks', icon: 'cake',
    note: 'Gluten-free desserts available. Ask your server.',
    groups: [
      {
        name: 'Sweet Shoppe',
        items: [
          { n: 'Specialty Pie', d: 'Ask what\'s fresh today. A la mode if you like.', tag: 'Favorite' },
          { n: 'Chocolate Sin Cake', d: 'A la mode if you like.' },
          { n: 'Cheesecake', d: 'Plain, or with blueberries, strawberries or raspberries.' },
          { n: 'Sundae', d: 'Chocolate, strawberry or raspberry.' },
          { n: 'Ice Cream', d: 'By the cup.' },
          { n: 'Root Beer Float' },
        ],
      },
      {
        name: 'Beverages',
        items: [
          { n: 'Coffee or Tea' },
          { n: 'Hot Chocolate' },
          { n: 'Milk or Chocolate Milk' },
          { n: 'Bottomless Soda', d: 'Pepsi, Diet Pepsi, Mt. Dew, root beer, 7-Up, iced tea and lemonade.' },
          { n: 'Strawberry or Raspberry Lemonade' },
          { n: 'Juice', d: 'Orange, apple, tomato or ruby red grapefruit.' },
        ],
      },
    ],
  },
];
