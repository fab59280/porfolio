<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ContactsRepository")
 */
class Contacts
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Entreprises", inversedBy="contacts")
     */
    private $entreprises;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mails", mappedBy="contacts")
     */
    private $mails;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Phones", mappedBy="contacts")
     */
    private $telephones;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Dates", mappedBy="contact")
     */
    private $dates;

    public function __construct()
    {
        $this->mails      = new ArrayCollection();
        $this->telephones = new ArrayCollection();
        $this->dates      = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEntreprises(): ?Entreprises
    {
        return $this->entreprises;
    }

    public function setEntreprises(?Entreprises $entreprises): self
    {
        $this->entreprises = $entreprises;

        return $this;
    }

    /**
     * @return Collection|Mails[]
     */
    public function getMails(): Collection
    {
        return $this->mails;
    }

    public function addMail(Mails $mail): self
    {
        if (!$this->mails->contains($mail)) {
            $this->mails[] = $mail;
            $mail->setContacts($this);
        }

        return $this;
    }

    public function removeMail(Mails $mail): self
    {
        if ($this->mails->contains($mail)) {
            $this->mails->removeElement($mail);
            // set the owning side to null (unless already changed)
            if ($mail->getContacts() === $this) {
                $mail->setContacts(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Phones[]
     */
    public function getTelephones(): Collection
    {
        return $this->telephones;
    }

    public function addTelephone(Phones $telephone): self
    {
        if (!$this->telephones->contains($telephone)) {
            $this->telephones[] = $telephone;
            $telephone->setContacts($this);
        }

        return $this;
    }

    public function removeTelephone(Phones $telephone): self
    {
        if ($this->telephones->contains($telephone)) {
            $this->telephones->removeElement($telephone);
            // set the owning side to null (unless already changed)
            if ($telephone->getContacts() === $this) {
                $telephone->setContacts(null);
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
            $date->setContact($this);
        }

        return $this;
    }

    public function removeDate(Dates $date): self
    {
        if ($this->dates->contains($date)) {
            $this->dates->removeElement($date);
            // set the owning side to null (unless already changed)
            if ($date->getContact() === $this) {
                $date->setContact(null);
            }
        }

        return $this;
    }


}
