<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Block definition class for the block_pluginname plugin.
 *
 * @package   block_pdfprint
 * @copyright 2023, Ben Nanson <ben.nanson@mito.org.nz>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */ 

class block_pdfprint extends block_base {
    
    public function init() {
        $this->title = get_string('pdfprint', 'block_pdfprint');
    }

    public function get_content() {
        if ($this->content !== null) {
            return $this->content;
        }

        // Block content, when button is clicked run the JS function at the top of this page.
        $this->content = new stdClass;
        $this->content->text = '<script src="/blocks/pdfprint/lib/html2pdf.bundle.min.js"></script>             <!-- External PDF library -->
                                <script src="/blocks/pdfprint/lib/printfunctions.js"></script>                  <!-- Functions containing all PDF/html conversions -->
                                <div>
                                  <a class="btn btn-primary" target="_blank" onclick="callPDFPrint()">Download Quiz</a>
                                </div>';
        $this->content->footer = '';

        return $this->content;
    }

    /**
     * Defines in which pages this block can be added.
     *
     * @return array of the pages where the block can be added.
     */
    public function applicable_formats() {
        return [
            'admin' => false,
            'site-index' => false,
            'quiz-view' => true,
            'course-view' => true,
            'mod' => true,
            'my' => false,
        ];
    }
}