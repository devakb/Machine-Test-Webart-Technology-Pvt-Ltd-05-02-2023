## Steps To Setup

* Extract the archive and put it in the folder you want
* Prepare your `.env` file there with database connection. (Copy the `.env.example` and rename it to `.env`)
* Run `composer install` command to install all laravel packages
* Run `php artisan key:generate` command to generate application key.
* Run `php artisan migrate` command to setup the database.
* Run `php artisan storage:link` command. **(optional)**
* Run `php artisan serve` to serve the project.




