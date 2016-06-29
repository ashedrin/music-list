<?php

namespace AppBundle\DataFixtures\Data;

class PerformerData {
    public static function getData() {
        return array(
            array(
                'title' => "Imagine Dragon",
                'genre' => "Indie rock",
                'songs' => array(
                    array('title' => "Radioactive", 'year' => 2009),
                    array('title' => "Tiptoe", 'year' => 2009),
                    array('title' => "It's Time", 'year' => 2009),
                    array('title' => "Demons", 'year' => 2009),
                    array('title' => "On Top of the World", 'year' => 2009),
                    array('title' => "Hear Me", 'year' => 2009),
                    array('title' => "Every Night", 'year' => 2009),
                    array('title' => "Underdog", 'year' => 2009),
                    array('title' => "Nothing Left to Say", 'year' => 2009),
                    array('title' => "Bleeding Out", 'year' => 2009)
                )
            ),
            array(
                'title' => "Katy Perry",
                'genre' => "Pop",
                'songs' => array(
                    array('title' => "Teenage Dream", 'year' => 2010),
                    array('title' => "Last Friday Night (T.G.I.F.)", 'year' => 2010),
                    array('title' => "California Gurls", 'year' => 2010),
                    array('title' => "Firework", 'year' => 2010),
                    array('title' => "Peacock"  , 'year' => 2010),
                    array('title' => "Circle the Drain", 'year' => 2010),
                    array('title' => "The One That Got Away", 'year' => 2010),
                    array('title' => "E.T.", 'year' => 2010),
                    array('title' => "Who Am I Living For?", 'year' => 2010),
                    array('title' => "Pearl", 'year' => 2010)
                )
            )
        );
    }
}