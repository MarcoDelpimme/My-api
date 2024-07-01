
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
        Schema::table('games', function (Blueprint $table) {
            $table->string('game_img')->nullable()->after('publisher');
            $table->string('game_img_large')->nullable()->after('game_img');
            $table->string('video')->nullable()->after('game_img_large');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('game_img');
            $table->dropColumn('game_img_large');
            $table->dropColumn('video');
        });
    }
};