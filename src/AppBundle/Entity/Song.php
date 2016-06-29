<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Song
 *
 * @ORM\Table(name="song")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SongRepository")
 */
class Song {
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string")
     */
    private $title;

    /**
     * @var integer
     *
     * @ORM\Column(name="year", type="integer")
     */
    private $year;

    /**
     * @ORM\ManyToOne(targetEntity="Performer", inversedBy="songs")
     * @ORM\JoinColumn(name="performer_id", referencedColumnName="id")
     */
    private $performer;

    /**
     * @ORM\ManyToOne(targetEntity="Genre", inversedBy="songs")
     * @ORM\JoinColumn(name="genre_id", referencedColumnName="id")
     */
    private $genre;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Song
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set year
     *
     * @param integer $year
     *
     * @return Song
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return integer
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set performer
     *
     * @param \AppBundle\Entity\Performer $performer
     *
     * @return Song
     */
    public function setPerformer(\AppBundle\Entity\Performer $performer = null)
    {
        $this->performer = $performer;

        return $this;
    }

    /**
     * Get performer
     *
     * @return \AppBundle\Entity\Performer
     */
    public function getPerformer()
    {
        return $this->performer;
    }

    /**
     * Set genre
     *
     * @param \AppBundle\Entity\Genre $genre
     *
     * @return Song
     */
    public function setGenre(\AppBundle\Entity\Genre $genre = null)
    {
        $this->genre = $genre;

        return $this;
    }

    /**
     * Get genre
     *
     * @return \AppBundle\Entity\Genre
     */
    public function getGenre()
    {
        return $this->genre;
    }
}
