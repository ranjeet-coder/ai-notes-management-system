<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EmbeddingService
{
    public static function generate(string $text): array
    {
        $text = strtolower($text);

        $keywords = [
            'php',
            'laravel',
            'react',
            'javascript',
            'symfony',
            'backend',
            'frontend',
            'database',
            'mysql',
            'api',
            'framework'
        ];

        $vector = [];

        foreach ($keywords as $keyword) {
            $vector[] = substr_count($text, $keyword);
        }

        return $vector;
    }
}
