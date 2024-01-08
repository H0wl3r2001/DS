# HotSquare

HotSquare aims to be a platform where landlords and tenants can establish connections, find new opportunities and evaluate mutually to provide insight to other users. There's also the service provider side of the platform, in which services can be offered, requested and evaluated. More details about the product should be found in the [product management](docs/product.md) documentation, which includes the product vision, market research and domain analysis.


## How to use

> Explain how to use your software from user standpoint. This can include short videos, screenshots, or API documentation, depending on what makes sense for your particular software system and target users. If needed, link to external resources or additional markdown files with further details (please place these in the [docs](docs/) directory).
>
> To be updated in next sprint.


## How to contribute

To contribute to the project a new developer must propose a new feature to implement. The associated User Story must be defined and added to the Product Backlog. Once the User Story is ready the new developer must create a new branch from main for it's implementation. 

The development of the User Story must be perceptible in the Product Backlog and adjust in order to match a gradual development, so the branch is never too outdated from main. For example, whenever a given feature is expected to take a long time to develop, it is appropriate to divide it into smaller work items and create the process stated for each of these (track in Product Backlog, new branch from main, consider done, create pull request, merge approved). The User Story is complete/done when all their work items are.

Once the developer considers the implementation of their User Story or associated work items complete/done, the developer can create the respective pull request and wait for approval by the remaining elements of the project (minimum 3, preferably from different teams) to be successfully merged.

Regarding the branch name and commit messages the developer should follow the indications below. 

More details about the technical vision can be found in the [development](docs/development.md) documentation, which includes information on architectural, design and technical aspects of the project, justifying the most important choices to show the soundness of the technical vision.


### Build and Test in a development environment

0. Clone Project: `git clone git@github.com:FEUP-MEIC-DS-2022-1MEIC06/DS.git`

1. Start Express Server
~~~sh
# considering terminal in folder ./hotsquare
cd server
npm install
npm start
~~~

2. Start React Web App
~~~sh
# considering terminal in folder ./hotsquare
cd app
npm install
npm start
~~~

The **Express Server** will be running in  `http://localhost:4000` and the **React Website** in `http://localhost:3000`.

To view the contents of the database, you can use a GUI like MongoDB Compass or access to `http://localhost:4000/listings` (and others requests).


### Definition of Ready (DoR)

We considered that a User Story is READY to move to the Sprint Backlog once it has acceptance testes and mockups associated. In addition, it must have a defined effort associated and be converted to an issue (with label 'user story') to more easily monitor its progress.


### Definition of Done (DoD)

We considered that a User Story is DONE when it corresponds to the mockup and passes the defined acceptance tests, although this validation in some cases can be manual and its associated pull request is reviewed by, at least, three developers, preferably from different teams, different from the team of the developer responsible for the pull request.

If the User Story was tasks associated (eg.: work items) is DONE when all their tasks are. The User Story must be kept in the Sprint Review while the implementation of its tasks and only moved to the column DONE in the Product Backlog when all its Tasks are already in this last column.

***NOTE***: this was only defined in the middle of the Sprint 1, so the first User Stories that were considered done did not follow this definition


### Conventions to Adopt

***NOTE***: These conventions were not adopted in sprint 1, as they were defined near its end.

#### Branch Naming

All branch names must be in lower case with words separated by *underscores* (_). In case a branch type is specified, it should precede the rest of the branch name and be followed by a *forward slash* (/). All branches must have a clear name that reflects their purpose and a certain hierarchy, starting from the most general point to a more specific one. Eg.: **feat/page_listings_catalog**, **feat/page_listings_details**, **feat/scrapping_olx**, **feat/scrapping_imovirtual**, **bug/logo_alignment**, etc. 

This results of a simplification of the Best Practices presented in the following websites related to this matter:
  - [Git Branch Naming Convention: 7 Best Practices to Follow](https://hackernoon.com/git-branch-naming-convention-7-best-practices-to-follow-1c2l33g2)
  - [Git Branching Naming Convention: Best Practices](https://codingsight.com/git-branching-naming-convention-best-practices/)


#### Commit Messages

Format to follow: `<type>(<scope>): <subject>` 
- Eg.: **design(listings): Changing display grid of Catalog Cards**

Valid commit messages `Types`:
- **feat**: A new feature
- **design**: A code that is related to styling
- **refactor**: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- **fix**: A bug fix
- **test**: Adding new test or making changes to existing test
- **docs**: Documentation related changes
- **other**: The ones that can't be associated with any specific category above


## How to run 

The process of package, deploy and run the system to a production (or production-like) environment is based on the built of a docker image.

To do so in the the directory `./hotsquare` execute the command `bash setup.sh && docker compose up`.

As in the development envirment the react application (frontend) run in `http://localhost:3000` and the server (backend) in`http://localhost:4000`.


## Contributions
 * [Team 1](factsheets/team1.md)
   * [Carolina Figueira](/factsheets/team1/carolina_figueira.md) (SPO)
   * [Filipe Fonseca](/factsheets/team1/filipe_fonseca.md)
   * [Francisco Pires](/factsheets/team1/francisco_pires.md)
   * [Jorge Costa](/factsheets/team1/jorge_costa.md)
   * [Luis Viegas](/factsheets/team1/luis_viegas.md) (SM)
   * [Patrícia Oliveira](/factsheets/team1/patricia_oliveira.md)
 * [Team 2](factsheets/team2.md)
   * [Adelaide Santos](/factsheets/team2/adelaide_santos.md)
   * [Carlos Veríssimo](/factsheets/team2/carlos_verissimo.md) (SPO)
   * [Carlos Gomes](/factsheets/team2/carlos_gomes.md)
   * [Luís Guimarães](/factsheets/team2/luis_guimaraes.md) (SM)
   * [Mariana Monteiro](/factsheets/team2/mariana_monteiro.md)
   * [Pedro Vale](/factsheets/team2/pedro_vale.md)
 * [Team 3](factsheets/team3.md)
   * [Afonso Monteiro](/factsheets/team3/afonso_monteiro.md)
   * [Edgar Torre](/factsheets/team3/edgar_torre.md)
   * [Margarida Ferreira](/factsheets/team3/margarida_ferreira.md) (SPO)
   * [Maria Almeida](/factsheets/team3/maria_almeida.md) (SM)
   * [Maria Beirão](/factsheets/team3/maria_beirao.md)
 * [Team 4](factsheets/team4.md)
   * [Bernardo Ferreira](/factsheets/team4/bernardo_ferreira.md)
   * [Diogo Maia](/factsheets/team4/diogo_maia.md)
   * [Guilherme Garrido](/factsheets/team4/guilherme_garrido.md)
   * [João Andrade](/factsheets/team4/joao_andrade.md) (SPO)
   * [João Rodrigo](/factsheets/team4/joao_rodrigo.md)
   * [Paulo Rodrigues](/factsheets/team4/paulo_rodrigues.md) (SM)
