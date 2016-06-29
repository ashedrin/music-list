<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\DataFixtures\Data\PerformerData;
use AppBundle\Entity\Song;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadSongData extends AbstractFixture implements OrderedFixtureInterface {

    public function load(ObjectManager $manager) {

        foreach(PerformerData::getData() as $performerData) {
            foreach($performerData['songs'] as $songData) {
                $song = new Song();
                $song->setTitle($songData['title']);
                $song->setPerformer($this->getReference($performerData['title']));
                $song->setGenre($this->getReference($performerData['genre']));
                $song->setYear($songData['year']);
                $manager->persist($song);
            }
        }

        $manager->flush();
    }

    public function getOrder() {
        return 3;
    }
}