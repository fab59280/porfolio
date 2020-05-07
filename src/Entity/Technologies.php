<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TechnologiesRepository")
 * @ApiResource(attributes={
 *     "security"="is_granted('ROLE_ADMIN')",
 *     "normalization_context"={"groups"={"read"}}
 *     })
 */
class Technologies
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "write"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true, name="tjm_region")
     * @Groups({"read", "write"})
     */
    private $tjmRegion;

    /**
     * @ORM\Column(type="integer", nullable=true, name="tjm_france")
     * @Groups({"read", "write"})
     */
    private $tjmFrance;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Missions", mappedBy="technos")
     * @ApiSubresource(maxDepth=1)
     */
    private $missions;

    public function __construct()
    {
        $this->missions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTjmRegion(): ?int
    {
        return $this->tjmRegion;
    }

    public function setTjmRegion(?int $tjmRegion): self
    {
        $this->tjmRegion = $tjmRegion;

        return $this;
    }

    public function getTjmFrance(): ?int
    {
        return $this->tjmFrance;
    }

    public function setTjmFrance(?int $tjmFrance): self
    {
        $this->tjmFrance = $tjmFrance;

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
            $mission->addTechno($this);
        }

        return $this;
    }

    public function removeMission(Missions $mission): self
    {
        if ($this->missions->contains($mission)) {
            $this->missions->removeElement($mission);
            $mission->removeTechno($this);
        }

        return $this;
    }

}
