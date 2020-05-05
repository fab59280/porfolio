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
     * @Groups({"read"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read"})
     */
    private $tjm_region;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read"})
     */
    private $tjm_france;

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
        return $this->tjm_region;
    }

    public function setTjmRegion(?int $tjm_region): self
    {
        $this->tjm_region = $tjm_region;

        return $this;
    }

    public function getTjmFrance(): ?int
    {
        return $this->tjm_france;
    }

    public function setTjmFrance(?int $tjm_france): self
    {
        $this->tjm_france = $tjm_france;

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
