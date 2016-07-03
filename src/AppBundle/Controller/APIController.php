<?php

namespace AppBundle\Controller;

use Doctrine\ORM\Query;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/** @Route("/api") */
class APIController extends Controller {

    /** @Route("/songs", name="api-songs") */
    public function songsAction(Request $request) {

        $manager = $this->getDoctrine()->getManager();

        $builder = $manager->getRepository('AppBundle:Song')->createQueryBuilder('s')
            ->select('s.id, p.title as performer, g.title as genre, s.title, s.year')
            ->leftJoin('s.performer', 'p')
            ->leftJoin('s.genre', 'g');

        $performerId = $request->get('performer');
        if($performerId != '') {
            $builder->andWhere('p.id = :performerId')
                ->setParameter('performerId', $performerId);
        }

        $genreId = $request->get('genre');
        if($genreId != '') {
            $builder->andWhere('g.id = :genreId')
                ->setParameter('genreId', $genreId);
        }

        $year = $request->get('year');
        if($year != '') {
            $builder->andWhere('s.year = :year')
                ->setParameter('year', $year);
        }

        $songsCount = count($builder->getQuery()->getResult());

        $songs = $builder
            ->setFirstResult(($request->get('page') - 1) * $request->get('displayCount'))
            ->setMaxResults($request->get('displayCount'))
            ->getQuery()->getResult(Query::HYDRATE_ARRAY);

        return new JsonResponse(array('songs' => $songs, 'totalCount' => $songsCount));
    }

    /** @Route("/filters", name="api-filters") */
    public function filtersData(Request $request) {
        $manager = $this->getDoctrine()->getManager();
        $filters = array(
            'performers' => $manager->getRepository('AppBundle:Performer')
                ->createQueryBuilder('p')
                ->select('p.id, p.title')
                ->orderBy('p.title')
                ->getQuery()
                ->getResult(Query::HYDRATE_ARRAY),
            'genres' => $manager->getRepository('AppBundle:Genre')
                ->createQueryBuilder('g')
                ->select('g.id, g.title')
                ->orderBy('g.title')
                ->getQuery()
                ->getResult(Query::HYDRATE_ARRAY)
        );
        return new JsonResponse($filters);
    }
}
