<?php

namespace App\Services;

class SimilarityService
{
    public static function cosine(array $a, array $b): float
    {
        $length = min(count($a), count($b));

        $dot = 0;
        $normA = 0;
        $normB = 0;

        for ($i = 0; $i < $length; $i++) {
            $dot += $a[$i] * $b[$i];
            $normA += $a[$i] * $a[$i];
            $normB += $b[$i] * $b[$i];
        }

        if ($normA == 0 || $normB == 0) {
            return 0;
        }

        return $dot / (sqrt($normA) * sqrt($normB));
    }
}