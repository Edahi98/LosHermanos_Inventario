<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // === SOLUCIÓN MIXED CONTENT PARA RENDER (HTTPS) ===
            // Forzar el esquema HTTPS para la generación de URLs
            URL::forceScheme('https');
        // ================================================
    }
}
