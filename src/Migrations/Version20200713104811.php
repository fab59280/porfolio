<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200713104811 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE telephone (id INT AUTO_INCREMENT NOT NULL, telephone VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A93B7323CB');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A93B7323CB FOREIGN KEY (phone_id) REFERENCES telephone (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A93B7323CB');
        $this->addSql('DROP TABLE telephone');
        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A93B7323CB');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A93B7323CB FOREIGN KEY (phone_id) REFERENCES phones (id)');
    }
}
