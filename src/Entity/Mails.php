<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MailsRepository")
 * @ApiResource(attributes={"security"="is_granted('ROLE_ADMIN')",
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     })
 */
class Mails
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contacts", inversedBy="mails")
     * @ApiSubresource(maxDepth=1)
     */
    private $contacts;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "write"})
     */
    private $email;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getContacts(): ?Contacts
    {
        return $this->contacts;
    }

    public function setContacts(?Contacts $contacts): self
    {
        $this->contacts = $contacts;

        return $this;
    }

}
