# Factsheet for Patrícia Oliveira

## Sprint 0

I prepared myself for the meeting with the PO by analysing the project specification available in moodle beforehand. 

After the kick-off meeting and taking into account the roadmap defined in the meeting, I wrote a set of topics that detail the tasks to be developed in the next sprint in *titles* format. Some of these ideas helped in the definition of the project's User Stories.

I was also responsible for the aggregation and merging of the User Stories of the teams, 
especially concerning the cleaning and formatting of the User Stories related to the *Service Provider*. Finally, I estimated the User Stories effort and inserted them in the Product Backlog (PBIs) in collaboration with Margarida Ferreira from Team 3.

Together with Margarida Ferreira (Team 3), I also created a shared [Google Spreadsheet](https://docs.google.com/spreadsheets/d/12-TqostcRgZ4Utd63FHXF8R2RWtocwdAFs32cudrV6E/edit?usp=sharing) to promote between/inside teams communication and organization while facilitating planning and managing of tasks.


### The two user stories that I am most proud of

Two User Stories that I wrote:

* As a service provider, I want to see the active contracts, so that I can organize my time according to the services I currently provide and know the information about my client.
* As a service provider, I want to add a new service, so that I can improve my service catalog and attract more clients


### The two pull requests that I am most proud of

In this Sprint there was no PR. 


### Two other contributions that I am especially proud of

* Creation of the shared [Google Spreadsheet](https://docs.google.com/spreadsheets/d/12-TqostcRgZ4Utd63FHXF8R2RWtocwdAFs32cudrV6E/edit?usp=sharing) for planning and managing sprint tasks (together with Margarida Ferreira from Team 3) in an attempt to create a mechanism through which the whole class would have information about what tasks were being developed and by whom, and consequently what remains to be done at a distance of one click, to combat the lack of communication. This tool also aimed to facilitate the assignment of the tasks, and keep track of their state. In this context, I was responsible for the original idea, organizing the pages, formatting the tables and keeping it up to date.
* Cleaning and formatting of the User Stories related to the *Service Provider*, after its aggregation and division, which I consider a good contribution to the project as a whole.

---

## Sprint 1

This sprint I focused on organizing and restructuring the react web application, as well as developing a property's detail page. The properties presented at the time of my implementation already corresponded to those that were scrapped from Idealista (scrapping was developed by Team 2). One of my best choises in this matter was the adoption of the `react-bootstrap` module since it facilitates the design and layout making this process faster as well as keep the code cleaner and more interpretable - [Restructure React App](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/pull/6).

After the Team 2 readjusts and defines the structure of a listing returned after a request to accommodate scrapping from several sites and aggre on the common attributes, I just needed to adapt the reference to each of the fields accordingly in the components **ListingCard.js** and **ListingDetail.js** - [related commit](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/commit/fcb4688f37a94f0f5296795d4b7f1ad3eb1c10a6). This changes was made in Pair Programming with Margarida Ferreira.

Furthermore, in order to be able to display the detail of a property, it was necessary to define and perform the corresponding request on the Express server (`http://localhost:4000/listings/:id`). It is thus possible to emphasize the vertical development involved in the sprint.


### The two user stories that I am most proud of

The User Story that I refined:

 * [As a User, I want to be able to view the rental properties in a catalogue, so that I can see all available properties](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/issues/7), dividing this user story in smaller tasks in order to distribuite responsabilities and work load among the the team as suggested by the Scrum Master as work items:
    - [Listings Catalog Page](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/issues/8)
    - [Listing Details Page](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/issues/9)


### The two pull requests that I am most proud of

 * [Restructure React App](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/pull/6)
 * [Listing Details Page](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/pull/12)

I consider that this two pull requests ar well described and are composed by commits that show small increments.


### Two other contributions that I am especially proud of

- Contribution in the pull request of [Listings Catalog Page](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/pull/21) by reviewing and commenting some code aspects mainly regarding css and bootstrap.
- Documentation of **Build and Test in a development environment**, **DoR**, **DoD**, **Branch Naming** and **How to run** sections in the README.md in Pair programming with Margarida Ferreira - [related commit](https://github.com/FEUP-MEIC-DS-2022-1MEIC06/DS/commit/aa70dd62a38f83b6fbba9577402cfcf584280bdb).


---

## Sprint 2

...


## Sprint 3

...


## Sprint 4

...


## Overall Product

Reflect on your specific contributions to the product as perceived by a user and, in particular, on the three categories below (see Dashboard > Final result > Product).


### Technical Soundness

...


### Product Realization

...


### Value for the Client

...
