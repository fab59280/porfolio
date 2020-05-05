<?php


namespace App\Controller;


use ApiPlatform\Core\Serializer\JsonEncoder;
use App\Entity\Entreprises;
use App\Repository\EntreprisesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;

class HomeController extends AbstractController
{

    public function __construct()
    {
    }

    /**
     * @Route(path="/vue/{VueRouter}", name="homepage")
     * @param Request $request
     *
     * @return Response
     */
    public function homepage(Request $request): Response
    {
        return $this->render('base.html.twig');
    }

}
