<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('children_pickedup_people', function (Blueprint $table) {
            $table->id();
            $table->foreignId('children_id')->constrained('childrens');
            $table->string('person_name');
            $table->string('relation');
            $table->string('contact_no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children_pickedup_people');
    }
};
