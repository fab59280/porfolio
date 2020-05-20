<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
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
     * @throws \JsonException
     */
    public function homepage(SerializerInterface $serializer): Response
    {
        $user = $this->getUser();
        $data = null;
        if (! empty($user)) {
            $userClone = clone $user;
            $userClone->setPassword('');
            $data = $serializer->serialize($userClone, JsonEncoder::FORMAT);
        }

        return $this->render('base.html.twig', [
            'isAuthenticated' => json_encode(!empty($user), JSON_THROW_ON_ERROR),
            'user' => $data ?? json_encode($data, JSON_THROW_ON_ERROR),
        ]);
    }

    /**
     * @Route(path="/{VueRouter}", name="vue_routes", requirements={"VueRouter"="^(?!api|admin|logout).*"}, methods={"GET"})
     * @param SerializerInterface $serializer
     *
     * @return Response
     * @throws \JsonException
     */
    public function vueRoutes(SerializerInterface $serializer): Response
    {
        $user = $this->getUser();
        $data = null;
        if (! empty($user)) {
            $userClone = clone $user;
            $userClone->setPassword('');
            $data = $serializer->serialize($userClone, JsonEncoder::FORMAT);
        }

        return $this->render('base.html.twig', [
            'isAuthenticated' => json_encode(!empty($user), JSON_THROW_ON_ERROR),
            'user' => $data ?? json_encode($data, JSON_THROW_ON_ERROR),
        ]);
    }

}
