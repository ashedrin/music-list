<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Genre;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadGenreData extends AbstractFixture implements OrderedFixtureInterface {

    private $genres = [
        "Indie rock", "Eurodance", "Industrial", "Electro", "Progressive", "Techno", "Disco", "Folk", "Hip-hop",
        'Jazz', "Latin", 'Pop', 'R&B', 'Rock', 'Country', 'Blues', 'Rap'
    ];

    public function load(ObjectManager $manager) {
        
        foreach($this->genres as $genreTitle) {
            $genre = new Genre();
            $genre->setTitle($genreTitle);
            $manager->persist($genre);
            $this->addReference($genreTitle, $genre);
        }
        
        $manager->flush();
    }

    public function getOrder() {
        return 1;
    }
}