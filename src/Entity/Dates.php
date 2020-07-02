<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DatesRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(attributes={
 *     "security"="is_granted('ROLE_ADMIN')",
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     })
 */
class Dates
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read", "write"})
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read", "write"})
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Entreprises", inversedBy="dates")
     * @ORM\JoinColumn(nullable=true)
     * @ApiSubresource(maxDepth=1)
     */
    private $entreprise;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Contacts", inversedBy="dates")
     * @ApiSubresource(maxDepth=1)
     */
    private $contact;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read","write"})
     */
    private $notes;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getEntreprise(): ?Entreprises
    {
        return $this->entreprise;
    }

    public function setEntreprise(?Entreprises $entreprise): self
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    public function getContact(): ?Contacts
    {
        return $this->contact;
    }

    public function setContact(?Contacts $contact): self
    {
        $this->contact = $contact;

        return $this;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(?string $notes): self
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue(): void
    {
        if($this->date === null) {
            $this->date = new DateTime();
        }
    }

}
