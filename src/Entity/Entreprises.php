<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EntreprisesRepository")
 * @ApiResource( attributes={
 *     "security"="is_granted('ROLE_ADMIN')",
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     "order"={"name"="ASC"}
 *     }
 *     )
 */
class Entreprises
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read", "write"})
     */
    private $type;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Addresses", cascade={"persist", "remove"})
     * @Groups({"read", "write"})
     * @ApiSubresource(maxDepth=1)
     */
    private $address;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Contacts", mappedBy="entreprises", cascade={"persist", "remove"})
     * @Groups({"read", "write"})
     * @ApiSubresource(maxDepth=1)
     */
    private $contacts;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Dates", mappedBy="entreprise", cascade={"persist", "remove"})
     * @Groups({"read", "write"})
     */
    private $dates;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Missions", mappedBy="entreprise", cascade={"persist", "remove"})
     * @Groups({"read", "write"})
     */
    private $missions;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read","write"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read", "write"})
     */
    private $siret;


    public function __construct()
    {
        $this->contacts = new ArrayCollection();
        $this->dates    = new ArrayCollection();
        $this->missions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getAddress(): ?Addresses
    {
        return $this->address;
    }

    public function setAddress(?Addresses $address): self
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return Collection|Contacts[]
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contacts $contact): self
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts[] = $contact;
            $contact->setEntreprises($this);
        }

        return $this;
    }

    public function removeContact(Contacts $contact): self
    {
        if ($this->contacts->contains($contact)) {
            $this->contacts->removeElement($contact);
            // set the owning side to null (unless already changed)
            if ($contact->getEntreprises() === $this) {
                $contact->setEntreprises(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Dates[]
     */
    public function getDates(): Collection
    {
        return $this->dates;
    }

    public function addDate(Dates $date): self
    {
        if (!$this->dates->contains($date)) {
            $this->dates[] = $date;
            $date->setEntreprise($this);
        }

        return $this;
    }

    public function removeDate(Dates $date): self
    {
        if ($this->dates->contains($date)) {
            $this->dates->removeElement($date);
            // set the owning side to null (unless already changed)
            if ($date->getEntreprise() === $this) {
                $date->setEntreprise(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Missions[]
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Missions $mission): self
    {
        if (!$this->missions->contains($mission)) {
            $this->missions[] = $mission;
            $mission->setEntreprise($this);
        }

        return $this;
    }

    public function removeMission(Missions $mission): self
    {
        if ($this->missions->contains($mission)) {
            $this->missions->removeElement($mission);
            // set the owning side to null (unless already changed)
            if ($mission->getEntreprise() === $this) {
                $mission->setEntreprise(null);
            }
        }

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }


}
