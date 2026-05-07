                          Answer to the ques. no. 2 
                          -------------------------
                    Using Pick and Omit to Keep our code dry
                    -----------------------------------------
When our application gets bigger and bigger sometimes we have to repeat same codes again and again. It is a problem because we might write some codes that conflicts others. thats why we 
use pick and omit utility .


* pick utility : 

interface User {
  id: number;
  name: string;
  email: string;
  pass: string;
  created: string;
}
Here is a interface called User .
interface PublicUser {
  id: number;
  name: string;
  email: string;
}
Here is a interface called PublicUser . PublicUser duplicates some fields from User . 
Pick creates a new type by selecting some specific properties from an existing interface.

type PublicUser = Pick<User, "id" | "name" | "email">

This helps PublicUser to stay same as User and there is no need to write extra lines . 

* Omit utility : 
Omit removes unwanted properties if a new type need to be declared.

type RemovePassFromUser = Omit<User, "pass">;
Now User will look like this : 

interface User {
  id: number;
  name: string;
  email: string;
  created: string;
}


Utilities are extremely useful to keep our code dry . It prevents code duplications . Code becomes cleaner and easier . 