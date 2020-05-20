<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/app_login", name="app_login", methods={"POST"})
     * @throws \JsonException
     */
    public function login(IriConverterInterface $iriConverter, SerializerInterface $serializer): JsonResponse
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".'
            ], 400);
        }

        $user = $this->getUser();
        $data = null;
        if (! empty($user)) {
            $userClone = clone $user;
            $userClone->setPassword('');
            $data = $serializer->serialize($userClone, JsonEncoder::FORMAT);
        }

        return $this->json([
            'user'            => $data,
            'isAuthenticated' => !empty($this->getUser())
        ], 200);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
