<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\DataFixtures\Data\PerformerData;
use AppBundle\Entity\Performer;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadPerformerData extends AbstractFixture implements OrderedFixtureInterface {

    public function load(ObjectManager $manager) {

        foreach(PerformerData::getData() as $performerData) {
            $performer = new Performer();
            $performer->setTitle($performerData['title']);
            $manager->persist($performer);
            $this->addReference($performerData['title'], $performer);
        }

        $manager->flush();
    }

    public function getOrder() { return 2; }
}