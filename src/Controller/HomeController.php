<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class HomeController extends AbstractController
{

    public function __construct()
    {
    }

    /**
     * @Route(path="/", name="homepage")
     * @param SerializerInterface $serializer
     *
     * @return Response
     */
    public function homepage(SerializerInterface $serializer): Response
    {
        return $this->render('base.html.twig', [
            'user' => $serializer->serialize($this->getUser(), 'jsonld')
        ]);
    }

    /**
     * @Route(path="/{VueRouter}", name="vue_routes", requirements={"VueRouter"="^(?!api|admin|logout).*"}, methods={"GET"})
     * @param SerializerInterface $serializer
     *
     * @return Response
     */
    public function vueRoutes(SerializerInterface $serializer): Response
    {
        return $this->render('base.html.twig', [
            'user' => $serializer->serialize($this->getUser(), 'jsonld')
        ]);
    }

}
