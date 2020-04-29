<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200429092603 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE contacts (id INT AUTO_INCREMENT NOT NULL, entreprises_id INT DEFAULT NULL, lastname VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, INDEX IDX_33401573A70A18EC (entreprises_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE missions (id INT AUTO_INCREMENT NOT NULL, entreprise_id INT NOT NULL, start DATETIME DEFAULT NULL, end DATETIME DEFAULT NULL, tjm INT DEFAULT NULL, nb_jours INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, INDEX IDX_34F1D47EA4AEAFEA (entreprise_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE missions_technologies (missions_id INT NOT NULL, technologies_id INT NOT NULL, INDEX IDX_206D7DF817C042CF (missions_id), INDEX IDX_206D7DF88F8A14FA (technologies_id), PRIMARY KEY(missions_id, technologies_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE technologies (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, tjm_region INT DEFAULT NULL, tjm_france INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE entreprises (id INT AUTO_INCREMENT NOT NULL, addresses_id INT DEFAULT NULL, address_id INT DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, INDEX IDX_56B1B7A95713BC80 (addresses_id), UNIQUE INDEX UNIQ_56B1B7A9F5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mails (id INT AUTO_INCREMENT NOT NULL, contacts_id INT DEFAULT NULL, INDEX IDX_63582005719FB48E (contacts_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dates (id INT AUTO_INCREMENT NOT NULL, entreprise_id INT NOT NULL, contact_id INT DEFAULT NULL, date DATETIME NOT NULL, type VARCHAR(255) DEFAULT NULL, INDEX IDX_AB74C91EA4AEAFEA (entreprise_id), INDEX IDX_AB74C91EE7A1254A (contact_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE phones (id INT AUTO_INCREMENT NOT NULL, contacts_id INT DEFAULT NULL, telephone VARCHAR(255) DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, INDEX IDX_E3282EF5719FB48E (contacts_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE addresses (id INT AUTO_INCREMENT NOT NULL, city VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contacts ADD CONSTRAINT FK_33401573A70A18EC FOREIGN KEY (entreprises_id) REFERENCES entreprises (id)');
        $this->addSql('ALTER TABLE missions ADD CONSTRAINT FK_34F1D47EA4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprises (id)');
        $this->addSql('ALTER TABLE missions_technologies ADD CONSTRAINT FK_206D7DF817C042CF FOREIGN KEY (missions_id) REFERENCES missions (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE missions_technologies ADD CONSTRAINT FK_206D7DF88F8A14FA FOREIGN KEY (technologies_id) REFERENCES technologies (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A95713BC80 FOREIGN KEY (addresses_id) REFERENCES addresses (id)');
        $this->addSql('ALTER TABLE entreprises ADD CONSTRAINT FK_56B1B7A9F5B7AF75 FOREIGN KEY (address_id) REFERENCES addresses (id)');
        $this->addSql('ALTER TABLE mails ADD CONSTRAINT FK_63582005719FB48E FOREIGN KEY (contacts_id) REFERENCES contacts (id)');
        $this->addSql('ALTER TABLE dates ADD CONSTRAINT FK_AB74C91EA4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprises (id)');
        $this->addSql('ALTER TABLE dates ADD CONSTRAINT FK_AB74C91EE7A1254A FOREIGN KEY (contact_id) REFERENCES contacts (id)');
        $this->addSql('ALTER TABLE phones ADD CONSTRAINT FK_E3282EF5719FB48E FOREIGN KEY (contacts_id) REFERENCES contacts (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mails DROP FOREIGN KEY FK_63582005719FB48E');
        $this->addSql('ALTER TABLE dates DROP FOREIGN KEY FK_AB74C91EE7A1254A');
        $this->addSql('ALTER TABLE phones DROP FOREIGN KEY FK_E3282EF5719FB48E');
        $this->addSql('ALTER TABLE missions_technologies DROP FOREIGN KEY FK_206D7DF817C042CF');
        $this->addSql('ALTER TABLE missions_technologies DROP FOREIGN KEY FK_206D7DF88F8A14FA');
        $this->addSql('ALTER TABLE contacts DROP FOREIGN KEY FK_33401573A70A18EC');
        $this->addSql('ALTER TABLE missions DROP FOREIGN KEY FK_34F1D47EA4AEAFEA');
        $this->addSql('ALTER TABLE dates DROP FOREIGN KEY FK_AB74C91EA4AEAFEA');
        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A95713BC80');
        $this->addSql('ALTER TABLE entreprises DROP FOREIGN KEY FK_56B1B7A9F5B7AF75');
        $this->addSql('DROP TABLE contacts');
        $this->addSql('DROP TABLE missions');
        $this->addSql('DROP TABLE missions_technologies');
        $this->addSql('DROP TABLE technologies');
        $this->addSql('DROP TABLE entreprises');
        $this->addSql('DROP TABLE mails');
        $this->addSql('DROP TABLE dates');
        $this->addSql('DROP TABLE phones');
        $this->addSql('DROP TABLE addresses');
    }
}
